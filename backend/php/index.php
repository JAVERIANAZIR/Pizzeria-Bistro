<?php
declare(strict_types=1);

// PHP 8+ API. Route all /api/* requests to this file with your web server.
$origin = getenv('ALLOWED_ORIGIN') ?: '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$catalogPath = dirname(__DIR__) . '/catalog.json';
$catalog = json_decode((string) file_get_contents($catalogPath), true);
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && str_ends_with($path, '/health')) {
    reply(200, ['ok' => true, 'service' => 'pizzeria-bistro-php']);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && str_ends_with($path, '/menu')) {
    reply(200, ['items' => $catalog]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !str_ends_with($path, '/orders')) {
    reply(404, ['error' => 'Route not found']);
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) reply(400, ['error' => 'Invalid JSON body']);

$customer = $body['customer'] ?? [];
$name = trim((string) ($customer['name'] ?? ''));
$phone = trim((string) ($customer['phone'] ?? ''));
$address = trim((string) ($customer['address'] ?? ''));
$items = $body['items'] ?? [];

if (strlen($name) < 2) reply(422, ['error' => 'Customer name is required']);
if (!preg_match('/^[+0-9() -]{7,20}$/', $phone)) reply(422, ['error' => 'A valid phone number is required']);
if (!is_array($items) || count($items) === 0) reply(422, ['error' => 'Order must contain items']);
if (count($items) > 50) reply(422, ['error' => 'Too many order lines']);

$clean = [];
$total = 0;
foreach ($items as $line) {
    $id = (string) ($line['id'] ?? '');
    $qty = (int) ($line['qty'] ?? 0);
    $size = isset($line['size']) ? (string) $line['size'] : null;
    if (!isset($catalog[$id]) || $qty < 1 || $qty > 20) reply(422, ['error' => 'Invalid order item']);
    $product = $catalog[$id];
    if (isset($product['sizes'])) {
        if ($size === null || !isset($product['sizes'][$size])) reply(422, ['error' => 'Invalid size for ' . $product['name']]);
        $unitPrice = (int) $product['sizes'][$size];
    } else {
        $unitPrice = (int) $product['price'];
        $size = null;
    }
    $clean[] = ['id' => $id, 'name' => $product['name'], 'size' => $size, 'qty' => $qty, 'unitPrice' => $unitPrice];
    $total += $unitPrice * $qty;
}

$order = [
    'id' => 'PB-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3))),
    'status' => 'received',
    'createdAt' => gmdate('c'),
    'customer' => ['name' => $name, 'phone' => $phone, 'address' => $address],
    'notes' => substr(trim((string) ($body['notes'] ?? '')), 0, 500),
    'items' => $clean,
    'total' => $total,
    'currency' => 'PKR'
];

$dataDir = dirname(__DIR__) . '/data';
if (!is_dir($dataDir)) mkdir($dataDir, 0775, true);
$saved = file_put_contents($dataDir . '/orders.jsonl', json_encode($order) . PHP_EOL, FILE_APPEND | LOCK_EX);
if ($saved === false) reply(500, ['error' => 'Could not save order']);

reply(201, ['ok' => true, 'order' => ['id' => $order['id'], 'status' => $order['status'], 'total' => $total, 'currency' => 'PKR']]);