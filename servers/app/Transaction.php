<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'customer_id',
        'code',
        'user_id',
        'indicator_total',
        'price',
        'status',
    ];

    public $timestamps = true;


    public function generateCode()
    {
        return rand(999, 9999);
    }

    public function scopeDibayar($query) 
    {
        return $query->where('status', '=', 'dibayar');
    }

    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
