<?php
/*** ---------- CHANGE THIS TO YOUR EMAIL ADDRESS ------------- ***/
$MAIL_TO = 'yourmail@yourdomain.com';
/*** ---------------------------------------------------------- ***/


$subject = "New Message";
$time = date('Y-m-d H:i');

$name = $_POST['name'];
$email = $_POST['email'];
$company = $_POST['company'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$body = "Time: $time\n";
$body .= "Name: $name\nEmail: $email\n";
$body .= "Subject: $subject\n";
$body .= "Company: $company\n";
$body .= "Message:\n$message";

$success = @mail($MAIL_TO, $subject, $body);

if ($success) {
	echo 'Message was sent successfully.';
} else {
	echo 'Please fix the errors above.';
}
?>