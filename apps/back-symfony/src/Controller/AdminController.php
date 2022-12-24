<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admin', name: 'app_admin')]
class AdminController extends AbstractController
{
    #[Route('/users', name: 'admin_all_users')]
    public function getAllUsers(UserRepository $userRepo): Response
    {
        $users = $userRepo->findAll();
        return $this->json($users);
    }

    #[Route('/user/edit', name: 'admin_edit_user')]
    public function editUser(UserRepository $userRepo, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent(), true);

        $user = $userRepo->find($data["id"]);

        $user->setRoles($data["roles"]);
        $user->setEmail($data["email"]);

        if($data["isPasswordChanged"])
        {
            $plaintextPassword = $data["password"];
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );

            $user->setPassword($hashedPassword);
        }

        $userRepo->save($user, true);

        return $this->json($user);
    }
}
