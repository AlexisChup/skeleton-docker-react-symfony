<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[Route('/user', name: 'api_user')]
class UserController extends AbstractController
{
    public function __construct(TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    #[Route('/register', name: 'user_register')]
    public function register(UserRepository $userRepo, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();

        $plaintextPassword =$data["password"];
        // hash the password (based on the security.yaml config for the $user class)
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );

        $user->setPassword($hashedPassword);
        $user->setEmail($data["email"]);
        $user->setRoles(["ROLE_USER"]);



        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $userRepo->save($user, true);

        return $this->json("OK");
    }

    #[Route('/user-info', name: 'user_info')]
    public function getUserInfo(Request $request) {
//        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $this->getUser();
        return new Response(sprintf('Logged in as %s', $this->getUser()->getEmail()));
        $auth = $request->headers->get("Authorization");
//        return new Response("Authorization: ". "'".$auth."'");
    }
}
