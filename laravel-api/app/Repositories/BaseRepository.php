<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface BaseRepository
{
    public function all(): Collection;
    public function find(int $id): ?Model;
    public function create(array $data): Model;
    public function update(int $id, array $data): ?Model;
    public function delete(int $id): bool;
}
