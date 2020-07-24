<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use App\Http\Resources\TransactionResource;

class TransactionController extends Controller
{
    public function index()
    {
        if($search = \Request::get('status')) {
            $transactions = Transaction::dibayar()->with('customer')->with('user')->paginate(20);
        } else {
            $transactions = Transaction::with('customer')->with('user')->paginate(20);
        }

        return TransactionResource::collection($transactions);
    }
}
