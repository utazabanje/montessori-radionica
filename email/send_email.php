<?php
header('Content-Type: application/json');
echo json_encode(['method' => $_SERVER['REQUEST_METHOD']]);
// Provera da li je POST zahtev
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Nepoznat zahtev']);
    exit;
}

// Čišćenje i validacija podataka
$name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$message = filter_var($_POST['message'] ?? '', FILTER_SANITIZE_STRING);

if (!$name || !$email || !$message) {
    echo json_encode(['success' => false, 'message' => 'Molimo popunite sva polja ispravno.']);
    exit;
}

// Postavi svoj email na koji želiš da primaš poruke
$to = 'pileticmiodrag@gmail.com';  // promeni na svoj email
$subject = 'Nova poruka sa sajta';
$body = "Ime i prezime: $name\nEmail: $email\nPoruka:\n$message";
$headers = "From: $email\r\nReply-To: $email\r\n";

// Pošalji email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Nešto je pošlo po zlu prilikom slanja emaila.']);
}
