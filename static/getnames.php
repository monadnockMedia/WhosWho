

<?php
	$letter = ( isset($_POST['letter'])) ? $_POST['letter'] : $_GET['letter'] ;
	$q = "SELECT * FROM WhosWho WHERE Last like '$letter%'";
//	$q = "SELECT * FROM WhosWho";
	$db = new SQLite3('who.db');

	$results = $db->query($q);

	echo '<ul class ="names">';
	while ($row = $results->fetchArray()) {
 		// /var_dump($row);
 	echo "<li><a href='#".$row[id]."'>". $row[First]." ".$row[Middle]." ".$row[Last]."</li>";
	}
	echo "</ul>";
?>