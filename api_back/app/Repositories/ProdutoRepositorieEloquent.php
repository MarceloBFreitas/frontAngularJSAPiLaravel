<?php
namespace App\Repositories;

use App\Model\Produto;
use Prettus\Repository\Eloquent\BaseRepository;

class ProdutoRepositorieEloquent extends BaseRepository implements ProdutoRepository
{
    public function model()
    {
        return Produto::class;
    }
}