<?php
$IMG_PATH = "IMG/PEOPLE/";
	$ID = ( isset($_POST['id'])) ? $_POST['id'] : $_GET['id'] ;
	$q = "SELECT * FROM WhosWho WHERE id = ".$ID;
//	$q = "SELECT * FROM WhosWho";
	$db = new SQLite3('who.db');
	$results = $db->query($q);
	
$row = $results->fetchArray();


$FIRST	= $row["First"];
$LAST	= $row["Last"];
$MIDDLE	= $row["Middle"];
$BIRTH	= $row["Birth"];
$DEATH	= $row["Death"];
$BODY	= $row["Body1"];
$IMG	= $row["Photo"];



echo "<div class = 'half'><img class = 'headshot' src ='".$IMG_PATH.$IMG."' /></div>
<div class = 'half'><div id ='bio'><h1>".$LAST.",  ".$FIRST." ".$MIDDLE."</h1><h1>(".$BIRTH."-".$DEATH.")</h1><p>".$BODY."</p></div></div>"

?>




