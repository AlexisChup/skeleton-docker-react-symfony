<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/public/product', name: 'api_product')]
class ProductController extends AbstractController
{
    #[Route('/create', name: 'create_product', methods: 'POST')]
    public function createProduct(ProductRepository $productRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $product = new Product();

        $product->setName($data["name"]);
        $product->setPrice($data["price"]);
        $product->setDescription($data["description"]);

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $productRepository->save($product, true);

        return $this->json("OK");
    }

    #[Route('/all', name: 'product_show_all', methods: 'GET')]
    public function showAll(ProductRepository $productRepository): Response
    {
        return $this->json($productRepository->findAll());
    }

    #[Route('/remove/{id}', name: 'product_remove', methods: 'DELETE')]
    public function remove(ProductRepository $productRepository, int $id): Response
    {
        $productRepository->removeById($id);
        return $this->json("OK");
    }

    #[Route('/edit/{id}', name: 'product_edit', methods: 'PUT')]
    public function update(ProductRepository $productRepository, Request $request, int $id): Response
    {
        $product = $productRepository->find($id);
        $data = json_decode($request->getContent(), true);

        if (!$product) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        $product->setName($data["name"]);
        $product->setPrice($data["price"]);
        $product->setDescription($data["description"]);
        $res = $productRepository->updateProduct($product);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'product_show', methods: 'GET')]
    public function show(ProductRepository $productRepository, int $id): Response
    {
        $product = $productRepository->find($id);

        if (!$product) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        return $this->json($product);
    }
}
