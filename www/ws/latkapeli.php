<?php
$dns = "mysql:host=localhost;dbname=latkapeli;";
$tunnus = "root";
$salasana = "";

try {//virheviesti jos kirjautuminen/yhteys ei onnistu tietokantaan
	$yhteys = new PDO($dns, $tunnus, $salasana);
} catch (PDOException $e){
	die("Virhe: ".$e->getMessage());
}
$yhteys->exec("SET NAMES utf8");

//Kopataan tiedot
$data = file_get_contents("php://input");
$tiedot = json_decode($data);

$metodi = $_SERVER['REQUEST_METHOD'];

switch ($metodi) {
	case "GET" : $sql_lause = "SELECT * FROM pelitiedot ORDER BY convert(`pisteet`, decimal) DESC LIMIT 10";
		break;
	
	case "PUT" : $sql_lause = "INSERT INTO pelitiedot (nimi, pisteet) VALUES ('".$tiedot->nimi."','".$tiedot->pisteet."');";
		break;
		
    case "POST": $sql_lause="UPDATE pelitiedot SET nimi='".$tiedot->nimi."', pisteet='".$tiedot->pisteet."', kysymys3='".$tiedot->kysymys2."'";
        break;
    
    case "DELETE": $sql_lause="DELETE FROM pelitiedot WHERE id='".$tiedot->id."';";
        break;
    
    default: $paluuviesti="Webservice vastaa: ei tuettu method (".$method.")";
        break;
}

$kysely = $yhteys->prepare($sql_lause);
$kysely->execute();

//paluu viesti kamaa
header("Access-Control-Allow-Origin: *"); // CORS
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");//Tietyt Chromen versiot vaativat POST varten
//header("Content-type: application/json");
header("Content-type: text/plain");
echo json_encode($kysely->fetchAll(PDO::FETCH_ASSOC));
?>
