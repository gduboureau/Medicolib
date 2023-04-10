# PdP-Project
https://moodle1.u-bordeaux.fr/pluginfile.php/1865092/mod_folder/content/0/Farah%20Sarah%20Ouada.pdf

## Auteurs

* Ephrem Jennifer
* Duboureau Guillaume
* Loustau Valentin
* Goudoussy Diallo Abdoul

## Prérequis et Technologies

* Apache Maven 3.6.3 ou plus
* Node.js 18.15.0 ou plus
* Java 17 ou plus

## Dépendances

* Spring Boot 3.0.4 :
  ├──org.springframework.boot 3.0.4
  ├──org.postgresql 42.5.4
  ├──io.jsonwebtoken 0.9.1
  ├──javax.xml.bind 2.3.0
  └──com.jayway.jsonpath 2.2.0
  
* React 18.2.0 :
  ├── @fullcalendar/core 6.1.5
  ├── @fullcalendar/daygrid 6.1.5
  ├── @fullcalendar/interaction 6.1.5
  ├── @fullcalendar/react 6.1.5
  ├── @fullcalendar/timegrid 6.1.5
  ├── @react-pdf/renderer 3.1.9
  ├── @testing-library/jest-dom 5.16.5
  ├── @testing-library/react 13.4.0
  ├── @testing-library/user-event 13.5.0
  ├── axios 1.3.4
  ├── cors 2.8.5
  ├── jwt-decode 3.1.2
  ├── moment 2.29.4
  ├── querystring-es3 0.2.1
  ├── react-bootstrap 2.7.2
  ├── react-dom 18.2.0
  ├── react-render 4.0.0
  ├── react-router-dom 6.10.0
  ├── react-scripts 5.0.1
  └── web-vitals 2.1.4

## Compatibilité du serveur

* Testé avec Ubuntu 22.04.2 LTS :
 - Compatible : Windows 11, Linux, Debian Buster

## Compatibilité du client

* Testé avec Ubuntu 22.04.2 LTS, et Windows 11 10.0.22621 :
  - Compatible : Google Chrome, Firefox

## Execution 

1. Ouvrir un premier terminal à partir de la racine du projet :
2. Se placer dans le repertoire /backend/medical-practice
3. mvn clean install
4. mvn package
5. mvn springboot:run

6. Ouvrir un deuxième terminal à partir de la racine du projet (ne pas fermer le premier terminal) :
7. Se placer dans le repertoire /frontend/medical-practice
8. npm install
9. npm start

10. Se rendre à l'adresse http://localhost:3000 depuis un navigateur Web
