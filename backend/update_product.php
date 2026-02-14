



 <?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once('config.php');
if (!$conn) {
  echo json_encode(["status" => "error", "message" => "DB connection failed"]);
  exit;
}

/* ===============================
   BASIC PRODUCT DATA
================================ */

$id           = (int)($_POST['id'] ?? 0);
$title        = $_POST['title'] ?? '';
$onsale       = (int)($_POST['onsale'] ?? 0);
$realprice    = (int)($_POST['realprice'] ?? 0);
$saleprice    = (int)($_POST['saleprice'] ?? 0);
$offamount    = (int)($_POST['offamount'] ?? 0);
$desc         = $_POST['desc'] ?? '';
$onsupersale  = (int)($_POST['onsupersale'] ?? 0);
$type         = $_POST['type'] ?? '';
$category     = $_POST['category'] ?? '';

$variants = json_decode($_POST['variants'] ?? '[]', true);

/* ===============================
   VALIDATION
================================ */

$validTypes = ['Tshirts', 'Trousers'];
$validCategories = ['تی شرت', 'شلوار'];

if (!in_array($type, $validTypes)) $type = '';
if (!in_array($category, $validCategories)) $category = '';

/* ===============================
   CURRENT IMAGES
================================ */

$current = $conn->query("SELECT src, images FROM products WHERE id=$id")
                ->fetch_assoc();

$currentSrc    = $current['src'] ?? '';
$currentImages = json_decode($current['images'] ?? '[]', true);

$uploadDir = '../images/';
$srcPath = $currentSrc;
$imagesPaths = $currentImages;

/* ===============================
   UPLOAD SRC IMAGE
================================ */

if (isset($_FILES['src']) && $_FILES['src']['error'] === UPLOAD_ERR_OK) {
  $srcName = basename($_FILES['src']['name']);
  move_uploaded_file($_FILES['src']['tmp_name'], $uploadDir . $srcName);
  $srcPath = $srcName;
}

/* ===============================
   UPLOAD GALLERY IMAGES
================================ */

if (!empty($_FILES['images']['name'][0])) {
  $imagesPaths = [];

  foreach ($_FILES['images']['name'] as $i => $name) {
    if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
      $cleanName = basename($name);
      move_uploaded_file(
        $_FILES['images']['tmp_name'][$i],
        $uploadDir . $cleanName
      );
      $imagesPaths[] = $cleanName;
    }
  }
}

$imagesJson = json_encode($imagesPaths);

/* ===============================
   UPDATE PRODUCT
================================ */

$stmt = $conn->prepare("
  UPDATE products SET
    title=?,
    onsale=?,
    realprice=?,
    saleprice=?,
    offamount=?,
    `desc`=?,
    src=?,
    images=?,
    onsupersale=?,
    type=?,
    category=?
  WHERE id=?
");

$stmt->bind_param(
  "siiiisssissi",
  $title,
  $onsale,
  $realprice,
  $saleprice,
  $offamount,
  $desc,
  $srcPath,
  $imagesJson,
  $onsupersale,
  $type,
  $category,
  $id
);

if (!$stmt->execute()) {
  echo json_encode([
    "status" => "error",
    "message" => $stmt->error
  ]);
  exit;
}

/* ===============================
   UPDATE VARIANTS
================================ */

/*
  Strategy:
  - Remove all existing variants
  - Insert only what admin selected
  - stock = 0 → still valid (disabled)
*/

$del = $conn->prepare("DELETE FROM product_variants WHERE product_id=?");
$del->bind_param("i", $id);
$del->execute();

if (!empty($variants)) {
  $ins = $conn->prepare("
    INSERT INTO product_variants
      (product_id, color_id, size_id, stock)
    VALUES (?, ?, ?, ?)
  ");

  foreach ($variants as $v) {
    $colorId = (int)$v['colorId'];
    $sizeId  = (int)$v['sizeId'];
    $stock   = (int)$v['stock'];

    $ins->bind_param("iiii", $id, $colorId, $sizeId, $stock);
    $ins->execute();
  }
}

/* ===============================
   DONE
================================ */

echo json_encode([
  "status" => "success",
  "product_id" => $id,
  "variants_saved" => count($variants)
]);

