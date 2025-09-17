import React from "react"
import { Head, Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodCategory } from "@/types/Frontend"
import {  login, register, subcategory } from '@/routes';

interface Props {
  foodCategories: FoodCategory[]
}

export default function Index({ foodCategories }: Props) {
  return (
    <>
      <Head title="QR Menu" />
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center px-10 py-6 fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <h1 className="text-2xl font-bold tracking-tight">🍴 QR Menu</h1>
          <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
            <a href="#" className="hover:text-black transition">Home</a>
            <a href="#" className="hover:text-black transition">Menu</a>
            <a href="#" className="hover:text-black transition">About</a>
            <a href="#" className="hover:text-black transition">Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <img
            src="/images/hero-food.jpg"
            alt="Restaurant Food"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.div
            className="relative text-center text-white px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
              Scan. Order. Enjoy.
            </h2>
            <p className="max-w-xl mx-auto text-lg text-gray-200 mb-8">
              A modern QR-based menu system that makes dining seamless & stylish.
            </p>
            <Button className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-lg">
              Explore Menu
            </Button>
          </motion.div>
        </section>

        {/* Menu Showcase */}
        <section className="py-20 px-8">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Food Categories
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {foodCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-56 object-cover"
                    />
                  )}

                  {/* Content */}
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {category.name}
                    </CardTitle>
                    {category.description && (
                      <p className="text-sm text-gray-500">
                        {category.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link href={subcategory(category.id)}>
                      <Button className="w-full rounded-xl font-medium shadow hover:shadow-lg transition-all">
                        View Items
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className="text-center py-24 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-6">Ready to Explore?</h3>
          <p className="text-gray-600 mb-8">
            Scan the QR at your table to browse and order instantly.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4 rounded-full shadow-lg">
            Start Ordering
          </Button>
        </motion.section>
      </div>
    </>
  )
}
