import Image from "next/image"

const investors = [
  { name: "TechVentures", logo: "/placeholder.svg?height=100&width=100", focus: "AI & Machine Learning" },
  { name: "GreenFund", logo: "/placeholder.svg?height=100&width=100", focus: "Sustainability" },
  { name: "HealthTech Capital", logo: "/placeholder.svg?height=100&width=100", focus: "Healthcare Innovation" },
  { name: "FinTech Accelerator", logo: "/placeholder.svg?height=100&width=100", focus: "Financial Technology" },
]

export default function Investors() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Potential Investors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {investors.map((investor) => (
          <div
            key={investor.name}
            className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <Image
              src={investor.logo || "/placeholder.svg"}
              alt={`${investor.name} logo`}
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center mb-2">{investor.name}</h2>
            <p className="text-center text-gray-600">{investor.focus}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

