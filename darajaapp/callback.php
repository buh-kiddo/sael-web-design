<?php

header("content-Type: application/json");
$stkCallbackResponse = file_get_contents('php://input');
$logFile = "Mpesastkreponse.json";
$log = fopen($logFile, "a");
fwrite($log, $stkCallbackResponse);
fclose($log);
