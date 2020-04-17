<?php

    function ajax_form(){
        $name = $_REQUEST['name'];
        $tel = $_REQUEST['tel'];
	    $email = $_REQUEST['email'];
        $checkbox = $_REQUEST['checkbox'];
        $response = '';
        $subject = $_REQUEST['header'];
        $mail_to = 'eomeru@yahoo.com';
        $mail_content = "Name: " . $name . " \nPhone: " . $tel . " \nE-mail: " . $email ." \ncheckbox: " . $checkbox;
        mail($mail_to, $subject, $mail_content);

        if(mail($mail_to, $subject, $mail_content)){
            $response = 'Sent ✔ ';
        }
        else{
            $response = 'Error ';
        }

        echo $response;

    }



?>