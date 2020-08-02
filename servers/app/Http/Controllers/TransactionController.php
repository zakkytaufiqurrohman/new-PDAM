<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use App\Setting;
use App\Customer;
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

    public function store(Request $request)
    {
        $this->validate($request, [
            'customer_id' => 'required',
            'indicator_total' => 'required',
            'price' => 'required',
            'status' => 'required'
        ]);
        $transaction = Transaction::create([
            'code' => rand(999, 9999),
            'customer_id' => $request->customer_id,
            'user_id' => auth('api')->user()->id,
            'indicator_total' => $request->indicator_total,
            'price' => $request->price,
            'status' => $request->status,
        ]);

        if($transaction) {
            return response([
                'status' => 'success',
                'message' => 'transaction created',
                'data' => $transaction
            ], 201);
        } else {
            return response([
                'status' => 'failed',
                'message' => 'error creating transaction',
            ], 500);
        }
    }

    public function update($id, Request $request)
    {
        $transaction = Transaction::find($id);
        $transaction->update([
            'customer_id' => $request->customer_id,
            'user_id' => $request->user_id,
            'indicator_total' => $request->indicator_total,
            'price' => $request->price,
            'status' => $request->status,
        ]);
        if($transaction) {
            return response([
                'status' => 'success',
                'message' => 'transaction updated',
                'data' => $transaction
            ], 200);
        }
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id)->delete();
        if($transaction) {
            return response([
                'message' => 'transaction deleted',
                'status' => 'success'
            ], 204);
        }
    }

    public function getCustomerTransaction(Request $request)
    {
        $data = Transaction::where('customer_id', $request->id)->with('customer')->orderBy('created_at', 'DESC')->first();
        if (!$data) {
            $customer = Customer::where('id', $request->id)->first()->attributesToArray();
            $customer = [
                'customer' => $customer 
            ];
            $temp = [
                'indicator_total' => 0 
            ];
            $temp = array_merge($customer, $temp);
            return Response()->json([
                'status' => 'success',
                'message' => 'getCustomerTransaction',
                'data' => $temp
            ]);
        }
        return Response()->json([
            'status' => 'success',
            'message' => 'getCustomerTransaction',
            'data' => $data
        ]);
    }
}
