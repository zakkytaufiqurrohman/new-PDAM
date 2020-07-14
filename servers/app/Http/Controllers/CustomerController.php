<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Http\Resources\CustomerResource;

class CustomerController extends Controller
{
    public function getAllCustomer()
    {
        $data = Customer::with('user')->paginate(5);
        return CustomerResource::collection($data);
    }
    public function insert(Request $request)
    {
        $this->validate($request, [
            'code' => 'nullable|unique:customers',
            'name' => 'required|min:3',
            'phone' => 'nullable|min:10|unique:customers',
            'user_id' => 'required',
            'address' => 'required|min:3'
        ]);
        $data = Customer::create([
            'code' => Customer::generateCode(4),
            'name' => $request->name,
            'phone' => $request->phone,
            'user_id' => $request->user_id,
            'address' => $request->address
        ]);
        return Response()->json([
            'status' => 'success',
            'message' => 'create customer',
            'data' => $data
        ],200);
    }
    public function edit(Request $request, $id)
    {
        $error = '';
        $status = "error";
        $message = '';
        $data = null;
        $this->validate($request, [
            'code' => 'required|unique:customers,code,'.$id,
            'name' => 'required|min:3',
            'phone' => 'nullable|min:10|unique:customers,phone,'.$id,
            'user_id' => 'required',
            'address' => 'required|min:3'
        ]);
        $data = Customer::find($id);
        if ($data) {
            $data->code = $request->code;
            $data->name = $request->name;
            $data->phone = $request->phone;
            $data->user_id = $request->user_id;
            $data->address = $request->address;
            if ($data->save) {
                $status = 'success';
                $message = 'edit customer success';
                $data = $data;
            }
            else {
                $message = 'edit failed';
            }
        }
        else {
            $message = 'user not found';
        }
        return Response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ],200);
    }
    public function delete($id)
    {
        $status = '';
        $message = 'error';
        $data = null;

        $customers = Customer::find($id);
        if ($customers) {
            if ($customers->delete()) {
                $status = 'success';
                $message = 'delete customer success';
                $data = $customers;
            }
            else {
                $message = 'delete failed';
            }
        }
        else {
            $message = 'user not found';
        }
        return Response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ],200);
    }
}
