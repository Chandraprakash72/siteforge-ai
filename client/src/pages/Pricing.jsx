import { ArrowLeft, Coins } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect to explore GenWeb.ai",
    features: [
      "AI website generation",
      "Responsive HTML output",
      "Basic animations",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹499",
    credits: 500,
    description: "Ideal for growing creators and professionals",
    features: [
      "Everything in Free plan",
      "Advanced website generation",
      "Custom domain linking",
      "Premium templates & themes",
      "Priority customer support",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1,999",
    credits: 2500,
    description: "Best for teams and large-scale production",
    features: [
      "Everything in Pro plan",
      "Unlimited website generation",
      "Team collaboration tools",
      "Dedicated account manager",
      "Custom code exports",
      "24/7 phone support",
    ],
    popular: false,
    button: "Contact Sales",
  },
];

function Pricing() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleBuy = async (planKey) => {
    if (!userData) {
      navigate("/");
      return;
    }

    if (planKey === "free") {
      navigate("/dashboard");
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/billing`,
        { planType: planKey },
        { withCredentials: true }
      );

      window.location.href = result.data.sessionUrl;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Back Button */}
      <button
        className="relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, transparent pricing
        </h1>

        <p className="text-zinc-400 text-lg">
          Buy credits once. Build anytime.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -14, scale: 1.03 }}
            className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all ${
              p.popular
                ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
                : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
            }`}
          >
            {/* Popular Badge */}
            {p.popular && (
              <span className="absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500 text-white">
                Popular
              </span>
            )}

            {/* Plan Name */}
            <h1 className="text-2xl font-semibold mb-3">
              {p.name}
            </h1>

            {/* Description */}
            <p className="text-zinc-400 mb-6">
              {p.description}
            </p>

            {/* Price */}
            <div className="text-4xl font-bold mb-2">
              {p.price}
            </div>

            {/* Credits */}
            <div className="flex items-center gap-2 mb-8">
              <Coins size={18} className="text-yellow-400" />
              <span className="font-semibold">
                {p.credits} Credits
              </span>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {p.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <span className="text-green-400">✓</span>
                  {feature}
                </div>
              ))}
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              onClick={() => handleBuy(p.key)}
              className={`w-full py-3 rounded-xl font-medium transition ${
                p.popular
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-white/10 hover:bg-white/20"
              } disabled:opacity-60`}
            >
              {loading ? "Redirecting..." : p.button}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;