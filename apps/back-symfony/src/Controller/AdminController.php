<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admin', name: 'app_admin')]
class AdminController extends AbstractController
{
    #[Route('/users', name: 'app_admin')]
    public function getAllUsers(UserRepository $userRepo): Response
    {
        $users = $userRepo->findAll();
        return $this->json($users);
    }
}
