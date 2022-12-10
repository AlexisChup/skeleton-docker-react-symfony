# Utilisation de symfony

Voici une liste des commandes que vous pouvez utiliser avec symfony console

## Création d'une entité

``` shell
symfony console make:entity EntityName
``` 

Penser ajouter l'import de OAnn pour les OAnn\Tag(name="Entity")

``` php
use OpenApi\Annotations as OAnn;
```

## Création d'un contrôleur

``` shell
symfony console make:controller EntityNameController
```

- A partir de là, des méthodes par défaut sont créées dans le contrôleur.
- Bien observer l'endpoint du contrôleur en haut de classe, c'est le début de la route de l'API.
- Bien observer le format des annotations Route par défaut pour pouvoir les reproduire par la suite
- Le chemin total pour récupérer les données d'une méthode, comme ci-dessous

``` php
// serveur        / route de l'api de la classe / route de la méthode
// localhost:8080 /api/utilisateur              /all
```

## Actualiser sa base de données

### 1. Créer un script de mise à jour de votre base de données

``` shell
symfony console make:migration
```

### 2. Utiliser le script pour mettre à jour les tables

``` shell
symfony console doctrine:migrations:migrate
```

### 3. Si vous avez des problèmes avec une migration

- Aller dans le répertoire **migrations**, supprimer tous les fichiers *Version\*.php*
- Dans la base de données, supprimer la table *doctrine_migration_versions*, comme ci-desous

``` sql
DROP TABLE doctrine_migration_versions;
```

## Gestion des Fixtures

### 1. Création d'un fichier de Fixtures

- Créer un fichier un fichier Fixtures pour votre entity

``` shell
symfony console make:fixture EntityNameFixtures
```

- Si vos Fixtures sont utilisés par d'autres Fixtures, ajouter la référence
  de votre fixture dans le manager

``` php
public function load(ObjectManager $manager): void
{
  //...
  $manager->persist($entity); 
  // $id : numéro de référence de votre entity
  // $entity : l'objet référencé 
  $this->addReference("entityName".$id,$entity);
  // ...
}  
```

- Si vos Fixtures utilisent d'autres Fixtures, il faut l'indiquer à la classe,
  avec l'interface de *DependentFixtureInterface* et avec la méthode *getDependencies()*
  qui retourne toutes les Fixtures utilisées par la classe

``` php 
class ChildrenFixtures extends Fixture implements DependentFixtureInterface
{
  public function load(ObjectManager $manager): void
  {
    //...
    $entity = new Entity();
    $entity->setParent($this->getReference("parentName".$id));
    $manager->persist($entity);
    // ...
    
    $manager->flush();
  }

  public function getDependencies(): array
  {
    return [
      ParentFixtures::class
    ];
  }
}
```

### 2. Utilisations de Faker

- Importer Faker/Factory
- Créer une instance de Faker avec *Factory::create('fr_FR')*
- Utiliser les attributs de la classe à retrouver ici https://github.com/fzaninotto/Faker

``` php
use Faker\Factory;

class EntityFixtures extends Fixture
{
  public function load(ObjectManager $manager): void
  {
    $faker = Factory::create("fr_FR");
    $faker->lastname   // Nom de famille
    $faker->city       // Ville
    $faker->streetname // Rue
    // etc.
  }
}
```

### 3. Charger les fixtures

``` shell
symfony console doctrine:fixtures:load
```