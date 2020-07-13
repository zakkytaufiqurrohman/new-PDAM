<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Http\Resources\CustomerResource;

class CustomerController extends Controller
{
    public function getAllCustomer()
    {
        $data = Customer::with('user')->get();
        // dd($data);
        return new CustomerResource($data);
    }
}
