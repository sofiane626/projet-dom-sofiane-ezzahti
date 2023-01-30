# !/bin/bash

########################### CREATION STRUCTURE SASS + FONT AWESOME + BOOTSTRAP + SASS WATCH script #########################

# Structure + index.html complété
mkdir -p ./{src/sass/modules/,public/{img/,css/,fonts/,js/}} && touch index.html ./public/css/style.css ./public/js/main.js .gitignore
echo "node_modules" >> .gitignore

# Sass ou SCSS ?
echo "Besoin des fichiers en SASS ou en SCSS ? (a pour SASS, c pour SCSS)"
read typeFile
# Structure selon choix
while [[ $typeFile != "a" && $typeFile != "c" ]]; 
do
echo "Entrez 'a' pour SASS ou 'c' pour SCSS:"
read typeFile
done

    #Sass
if [[ $typeFile == "a" ]]; 
then
touch ./src/sass/modules/_style.sass ./src/sass/_fonts.sass ./src/sass/app.sass ./src/sass/_variables.sass
    #SCSS
elif [[ $typeFile == "c" ]]; 
then
touch ./src/sass/modules/_style.scss ./src/sass/_fonts.scss ./src/sass/app.scss ./src/sass/_variables.scss
fi

# Fonction d'écriture des imports dans app.sass
function importSass {
cat << EOF
// Fonts
@import ./_fonts
// Variables
@import ./_variables
EOF
}
# Fonction d'écriture des imports dans app.scss
function importScss {
cat << EOF
// Fonts
@import './_fonts';
// Variables
@import './_variables';
EOF
}

# Imports dans Sass ou SCSS
    #Sass
if [[ $typeFile == "a" ]]; 
then
importSass >> ./src/sass/app.sass
    #SCSS
elif [[ $typeFile == "c" ]]; 
then
importScss >> ./src/sass/app.scss
fi



# Fonction d'écriture de la structure HTML
function html {
cat << EOF
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./public/css/style.css">
    <title>Document</title>
</head>

<body>
    
    
</body>

</html>
EOF
}
html >> index.html

# Question pour suppléments
    # Font Awesome ?
echo "Besoin de Font Awesome ? (y pour accepter)"
read faw
# Installation de Font Awesome
if [[ $faw == "y" ]]
then
npm init -y && npm i @fortawesome/fontawesome-free
    # Import Font Awesome dans app.sass ou app.scss
        #Sass
if [[ $typeFile == "a" ]]; 
then
{
echo -e "// Fontawesome\n\$fa-font-path : '../../node_modules/@fortawesome/fontawesome-free/webfonts'\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss'\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/solid.scss'\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/brands.scss'\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/regular.scss'" >> ./src/sass/app.sass
}
        #SCSS
elif [[ $typeFile == "c" ]]; 
then
{
echo -e "// Fontawesome\n\$fa-font-path: '../../node_modules/@fortawesome/fontawesome-free/webfonts';\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss';\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/solid.scss';\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/brands.scss';\n@import '../../node_modules/@fortawesome/fontawesome-free/scss/regular.scss';" >> ./src/sass/app.scss
}
fi
fi

    # Bootstrap ?
echo "Besoin de Bootstrap ? (y pour accepter)"
read bootstrap
# Installation de Bootstrap
if [[ $bootstrap == "y" ]]
then
{
npm install bootstrap
    # Ajout du script JS Bootstrap dans HTML à la ligne 15
sed -i "15i\<\!-- Script JS Bootstrap -->\n<script src='./node_modules/bootstrap/dist/js/bootstrap.bundle.js'></script>" index.html
    # Import BootStrap dans app.sass ou app.scss
        #Sass
if [[ $typeFile == "a" ]]; 
then
{
echo -e "// Bootstrap \n@import '../../node_modules/bootstrap/scss/bootstrap.scss'" >> ./src/sass/app.sass
}
        #SCSS
elif [[ $typeFile == "c" ]]; 
then
{
echo -e "// Bootstrap \n@import '../../node_modules/bootstrap/scss/bootstrap.scss';" >> ./src/sass/app.scss
}
fi
}
fi

    # Modules JS ?
echo "Besoin de décomposer le JavaScript en modules ? (y pour accepter)"
read js
# Création des modules de JavaScript
if [[ $js == "y" ]]
then
{
mkdir -p ./public/js/modules && touch ./public/js/modules/objects.js ./public/js/modules/classes.js ./public/js/modules/instances.js ./public/js/modules/functions.js 
# Ajout du lien JS dans HTML à la ligne 18
sed -i "18i\<script src='./public/js/main.js' type='module'></script>" index.html
}
else  
sed -i "18i\<script src='./public/js/main.js'></script>" index.html
fi


    # Variables ?
echo "Besoin d'ajouter et/ou modifier des variables Bootstrap et Sass/SCSS ? (y pour accepter)"
read variables
# Ajout des imports pour ajout/modification de variables Bootstrap dans _variables.sass
function variablesSass {
cat  << EOF
@import "../../node_modules/bootstrap/scss/_functions.scss"
@import "../../node_modules/bootstrap/scss/_variables.scss"

// COLORS Sass
\$lightgrey: #dddddd

// COLORS Bootstrap
\$custom-colors: ("lightgrey": #dddddd)

// Merge the maps
\$theme-colors: map-merge(\$theme-colors, \$custom-colors)
EOF
}

function variablesScss {
cat  << EOF
@import "../../node_modules/bootstrap/scss/_functions.scss";
@import "../../node_modules/bootstrap/scss/_variables.scss";

// COLORS Sass
\$lightgrey: #dddddd;

// COLORS Bootstrap
\$custom-colors: ("lightgrey": #dddddd);

// Merge the maps
\$theme-colors: map-merge(\$theme-colors, \$custom-colors);
EOF
}


if [[ $variables == y ]]
then
# Imports dans Sass ou SCSS
    #Sass
if [[ $typeFile == "a" ]]; 
then
variablesSass >> ./src/sass/_variables.sass
    #SCSS
elif [[ $typeFile == "c" ]]; 
then
variablesScss >> ./src/sass/_variables.scss
fi
fi

    #  Modules ?
echo "Besoin de modules SASS/SCSS ? (y = _navbar, _header, _section, _footer ; Autre lettre = Aucun)"
read modules
# Tous
if [ $modules == y ]
then
{
# Imports dans Sass ou SCSS
    #Sass
if [[ $typeFile == "a" ]]; 
then
{
echo -e "@import ./_navbar\n@import ./_header\n@import ./_section\n@import ./_footer" >> ./src/sass/modules/_style.sass && touch ./src/sass/modules/_navbar.sass ./src/sass/modules/_header.sass ./src/sass/modules/_section.sass ./src/sass/modules/_footer.sass
}
    #SCSS
elif [[ $typeFile == "c" ]]; 
then
{
echo -e "@import './_navbar';\n@import './_header';\n@import './_section';\n@import './_footer';" >> ./src/sass/modules/_style.scss && touch ./src/sass/modules/_navbar.scss ./src/sass/modules/_header.scss ./src/sass/modules/_section.scss ./src/sass/modules/_footer.scss
}
fi
}
fi


# Quitter
if [ $modules != y ]
then
echo "Ok, suppression du pc"
fi


# Ajout import _style.sass dans app.sass ou app.scss
    #Sass
if [[ $typeFile == "a" ]]; 
then
{
echo -e "// Style\n@import ./modules/_style" >> ./src/sass/app.sass
# SASS watch du CSS
sass --watch src/sass/app.sass:public/css/style.css
}
    #SCSS
elif [[ $typeFile == "c" ]]; 
then
echo -e "// Style\n@import './modules/_style';" >> ./src/sass/app.scss
# SASS watch du CSS
sass --watch src/sass/app.scss:public/css/style.css
fi