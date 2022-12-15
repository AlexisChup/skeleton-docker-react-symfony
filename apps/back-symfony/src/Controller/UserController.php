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
use Symfony\Component\Serializer\SerializerInterface;


#[Route('/api/user', name: 'api_user')]
class UserController extends AbstractController
{
    public function __construct(private SerializerInterface $serializer)
    {
    }

    #[Route('/register', name: 'user_register')]
    public function register(UserRepository $userRepo, Request $request, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): Response
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



        $userRepo->save($user, true);
        $res = $this->serializer->normalize($user, 'json');
        unset($res["password"]);
        $res["token"] = $JWTManager->create($user);
        return $this->json($res);
    }

    #[Route('/profile', name: 'profile')]
    public function getUserInfo(Request $request) {
        $user = $this->getUser();
        $res = $this->serializer->normalize($user, 'json');
        unset($res["password"]);
        return $this->json($res);
    }
}
