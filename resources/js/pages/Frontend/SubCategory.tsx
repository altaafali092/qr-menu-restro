import React from "react"
import { Head, Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SubFoodCategory } from "@/types/Admin/Food"



interface Props {
  subCategories: SubFoodCategory[]
}

export default function SubCategory({ subCategories }: Props) {
  return (
    <>
      <Head title="Sub Categories" />
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center px-10 py-6 fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <h1 className="text-2xl font-bold tracking-tight">🍴 QR Menu</h1>
          <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <Link href="/menu" className="hover:text-black transition">
              Menu
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center">
          {/* <img
            src={subCategories[0].image || "/images/hero-food.jpg"}
            alt="Food"
            className="absolute inset-0 w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            className="relative text-center text-white px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
              Sub Categories
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              Explore our delicious variety crafted just for you.
            </p>
          </motion.div>
        </section>

        {/* SubCategory Grid */}
        <section className="py-16 px-6 md:px-12">
          {subCategories.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No sub-categories available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {subCategories.map((sub) => (
                <motion.div
                  key={sub.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {sub.image && (
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {sub.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        {sub.description || "No description available."}
                      </p>
                      <Button className="rounded-xl font-medium shadow hover:shadow-lg transition-all">
                        View Items
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
