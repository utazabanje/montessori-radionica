<?php
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => false, 'message' => 'Nepoznat zahtev']);
        exit;
    }

    $name = trim($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $message = trim($_POST['message'] ?? '');

    if (!$name || !$email || !$message) {
        echo json_encode(['success' => false, 'message' => 'Molimo popunite sva polja ispravno.']);
        exit;
    }

    $to = 'cukarica.centar@gmail.com';
    $subject = 'Nova poruka sa sajta';
    $body = "Ime i prezime: $name\nEmail: $email\nPoruka:\n$message";

    $headers = "From: Kontakt forma <kontakt@montesoriboravak.rs>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Bcc: pileticmiodrag@gmail.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nešto je pošlo po zlu prilikom slanja emaila.']);
    }
?>