<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SigninRequest;
use App\Http\Requests\User\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    function signup(SignupRequest $request)
    {

        // create user store in database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);

        // return response 
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    function signin(SigninRequest $request)
    {
        // check user password
        $user = User::where('email', $request->email)->first();

        // virify password
        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => 'Password does not match.',
            ]);
        }

        // generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        // return response
        return response([
            'message' => 'User signed in.',
            'user' => $user,
            'token' => $token
        ], 200);

    }

    function signout(Request $request)
    {
        $user = $request->user();

        // option 1
        $user->currentAccessToken()->delete();

        // option 2
        // $currentToken = $user->currentAccessToken();
        // $user->tokens()->where('id', $currentToken->id)->delete();

        return response([
            'message' => 'User signed out.'
        ], 200);
    }
    function verify(Request $request)
    {
        return response([
            'message' => 'Token is valid.',
            'user' => $request->user()
        ], 200);
    }
}

