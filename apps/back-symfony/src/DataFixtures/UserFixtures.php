<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture {
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setEmail('admin@gmail.com');
        $user->setRoles(array("ROLE_ADMIN"));
        $password = $this->hasher->hashPassword($user, 'admin');
        $user->setPassword($password);
        $manager->persist($user);

        $user = new User();
        $user->setEmail('user@gmail.com');
        $user->setRoles(array("ROLE_USER"));
        $password = $this->hasher->hashPassword($user, 'user');
        $user->setPassword($password);
        $manager->persist($user);

        for($i=0; $i<10;$i++)
        {
            $user = new User();
            $user->setEmail('user'.$i.'@gmail.com');
            $user->setRoles(array("ROLE_USER"));
            $password = $this->hasher->hashPassword($user, 'user'.$i);
            $user->setPassword($password);
            $manager->persist($user);
        }

        $manager->flush();
    }

}
