"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Shield, User, Eye, Medal, Users, Star, Plus, X } from "lucide-react";
import { getRoleIcon, getPlayerStatus } from "@/lib/utils";

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  position?: string;
  club?: string;
  role: string;
  country?: string;
  uploadedImageUrl?: string;
  createdAt: string;
  age?: number;
  rating?: number;
  status?: "active" | "scouted" | "contracted" | "potential";
  lastActivity?: string;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'player',
    position: '',
    club: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/dashboard/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      onSuccess();
      onClose();
      setFormData({
        fullName: '',
        email: '',
        role: 'player',
        position: '',
        club: '',
        country: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email * (will be used as initial password)
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="player">Player</option>
                <option value="coach">Scout</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {formData.role === 'player' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Club
                  </label>
                  <input
                    type="text"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/dashboard/users");
      if (!response.ok) {
        console.error("Failed to fetch users from API");
        setUsers([]);
      } else {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!user) return false;

    const searchFields = [
      user.fullName || "",
      user.email || "",
      user.position || "",
      user.club || "",
      user.country || "",
    ].map((field) => field.toLowerCase());

    const matchesSearch =
      searchQuery === "" ||
      searchFields.some((field) => field.includes(searchQuery.toLowerCase()));

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "players" && user.role === "player") ||
      (selectedFilter === "scouts" && user.role === "coach") ||
      (selectedFilter === "scouted" && user.status === "scouted") ||
      (selectedFilter === "contracted" && user.status === "contracted");

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: users.length,
    players: users.filter((u) => u.role === "player").length,
    scouts: users.filter((u) => u.role === "coach").length,
    scouted: users.filter((u) => u.status === "scouted").length,
    contracted: users.filter((u) => u.status === "contracted").length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              Talent Management
            </h1>
            <p className="text-gray-600">Loading talent database...</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-32 h-10 bg-blue-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="w-full h-96 bg-white rounded-lg border border-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-1">
            Talent Management
          </h1>
          <p className="text-sm text-gray-600">
            Discover, scout and manage football talent across Africa
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search talents..."
              className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="players">Players Only</option>
            <option value="scouts">Scouts Only</option>
            <option value="scouted">Scouted Players</option>
            <option value="contracted">Contracted Players</option>
          </select>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={18} />
            </div>
            <div>
              <p className="text-lg font-bold">{stats.total}</p>
              <p className="text-xs text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <User className="text-green-600" size={18} />
            </div>
            <div>
              <p className="text-lg font-bold">{stats.players}</p>
              <p className="text-xs text-gray-600">Players</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-purple-100 rounded-lg">
              <Shield className="text-purple-600" size={18} />
            </div>
            <div>
              <p className="text-lg font-bold">{stats.scouts}</p>
              <p className="text-xs text-gray-600">Scouts</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-yellow-100 rounded-lg">
              <Eye className="text-yellow-600" size={18} />
            </div>
            <div>
              <p className="text-lg font-bold">{stats.scouted}</p>
              <p className="text-xs text-gray-600">Scouted</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Medal className="text-emerald-600" size={18} />
            </div>
            <div>
              <p className="text-lg font-bold">{stats.contracted}</p>
              <p className="text-xs text-gray-600">Contracted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                const statusInfo = getPlayerStatus(user.status || "active");
                const StatusIcon = statusInfo.icon;

                return (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          {user.uploadedImageUrl ? (
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={user.uploadedImageUrl}
                              alt={user.fullName}
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <RoleIcon
                          className={`mr-1.5 h-3.5 w-3.5 ${
                            user.role === "admin"
                              ? "text-purple-500"
                              : user.role === "coach"
                              ? "text-emerald-500"
                              : "text-blue-500"
                          }`}
                        />
                        <span className="capitalize text-sm">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.position || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.club || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.country || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {user.age || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-900">
                          {user.rating?.toFixed(1) || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {user.status || "active"}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                      {user.lastActivity || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm">
                      <Link
                        href={`/profile/${user._id}`}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <Users className="mx-auto h-8 w-8 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Try adjusting your search or filter to find what you&apos;re looking
              for.
            </p>
          </div>
        )}
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
