<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 5; $i++) {
            $product = new Product();
            $product->setName("Produit n°" . $i);
            $product->setPrice(random_int(0, 100));
            $product->setDescription("Description du produit n°" . $i);
            $manager->persist($product);
        }

        $manager->flush();

    }
}
