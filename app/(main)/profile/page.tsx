"use client";

import { useState, useEffect } from "react";
import { Package, DollarSign, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebaseclient";
import { collection, getDocs, query, where } from "firebase/firestore";

interface UserStats {
  lifetimeOrders: number;
  lifetimeSpent: number;
  yearlyOrders: number;
  yearlySpent: number;
  monthlyOrders: number;
  monthlySpent: number;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    lifetimeOrders: 0,
    lifetimeSpent: 0,
    yearlyOrders: 0,
    yearlySpent: 0,
    monthlyOrders: 0,
    monthlySpent: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const cartRef = collection(db, "carts");
        const q = query(cartRef, where("userId", "==", user.uid));
        const snapshot = await getDocs(q);

        let lifetimeOrders = 0;
        let lifetimeSpent = 0;
        let yearlyOrders = 0;
        let yearlySpent = 0;
        let monthlyOrders = 0;
        let monthlySpent = 0;

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (!data.items) return;

          data.items.forEach((item: any) => {
            const orderDate = item.date
              ? new Date(item.date.seconds * 1000)
              : new Date();
            lifetimeOrders += item.quantity;
            lifetimeSpent += item.price * item.quantity;

            if (orderDate.getFullYear() === currentYear) {
              yearlyOrders += item.quantity;
              yearlySpent += item.price * item.quantity;
            }

            if (
              orderDate.getFullYear() === currentYear &&
              orderDate.getMonth() === currentMonth
            ) {
              monthlyOrders += item.quantity;
              monthlySpent += item.price * item.quantity;
            }
          });
        });

        setStats({
          lifetimeOrders,
          lifetimeSpent,
          yearlyOrders,
          yearlySpent,
          monthlyOrders,
          monthlySpent,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center pt-10">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-700"></div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* User Info Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 flex items-center space-x-6 hover:shadow-xl transition-shadow">
              <Avatar className="h-28 w-28 ring-4 ring-purple-200">
                <AvatarFallback className="bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 text-white text-3xl">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bg-clip-text text-transparent">
                  {user?.displayName || "Glowmart User"}
                </h2>
                <p className="text-gray-600 text-lg">{user?.email}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bg-clip-text text-transparent">
                My Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  icon={<Package className="h-10 w-10 text-purple-700" />}
                  title="Lifetime Orders"
                  value={stats.lifetimeOrders}
                />
                <StatCard
                  icon={<DollarSign className="h-10 w-10 text-purple-700" />}
                  title="Lifetime Spent"
                  value={`$${stats.lifetimeSpent.toFixed(2)}`}
                />
                <StatCard
                  icon={<Calendar className="h-10 w-10 text-purple-700" />}
                  title="This Year"
                  value={`${stats.yearlyOrders} orders`}
                  subvalue={`$${stats.yearlySpent.toFixed(2)} spent`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  subvalue,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subvalue?: string;
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-base font-medium text-gray-500">{title}</h4>
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-purple-700 to-purple-600 bg-clip-text text-transparent">
          {value}
        </p>
        {subvalue && <p className="text-sm text-gray-600">{subvalue}</p>}
      </div>
    </div>
  );
}
