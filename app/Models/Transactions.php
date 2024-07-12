<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Transactions extends Model
{
    use HasFactory;
    protected $table = "transactions";
    /**
     * 
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'price',
        'description',
        'category',
        'type',
        'user_id'
    ];

    
}
