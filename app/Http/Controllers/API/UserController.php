<?php

namespace App\Http\Controllers\API;

use App\Services\UserService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{

    public function __construct(
        protected UserService $userService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userService->all();
        
        return response()->json([
            'success' => true,
            'data' => $users,
            'message' => 'All users retrivied.'
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:144',
            'nickname' => 'required|string|max:20',
            'email' => 'required|string|max:100',
        ]);

        $user = $this->userService->create($data);

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'user created.'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $user = $this->userService->find($id);
        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'user found.'
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $data = $request->validate([
            'name' => 'string|max:144',
            'nickname' => 'required|string|max:20',
            'email' => 'required|string|max:100',
        ]);

        $user = $this->userService->update($data, $id);

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'user updated.'
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->userService->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
