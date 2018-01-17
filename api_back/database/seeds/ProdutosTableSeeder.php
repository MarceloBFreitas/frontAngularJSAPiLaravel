<?php

use Illuminate\Database\Seeder;
use App\Model\Produto;

class ProdutosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Produto::class,15)->create();
    }
}
