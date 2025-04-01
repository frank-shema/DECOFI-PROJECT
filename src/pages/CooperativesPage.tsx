
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Building, Globe, Handshake } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cooperatives = [
  {
    id: 1,
    name: "Community Savings SACCO",
    description: "A community-based savings cooperative focusing on small business growth and personal financial stability.",
    members: 1250,
    location: "Nairobi, Kenya",
    tags: ["Savings", "Loans", "Urban"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Rural Farmers Alliance",
    description: "Supporting agricultural development through accessible financing and community-based savings initiatives.",
    members: 870,
    location: "Kisumu, Kenya",
    tags: ["Agriculture", "Rural", "Development"],
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Women Empowerment Cooperative",
    description: "Focused on providing financial independence and entrepreneurship opportunities for women in urban areas.",
    members: 650,
    location: "Mombasa, Kenya",
    tags: ["Women", "Entrepreneurship", "Training"],
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Tech Workers SACCO",
    description: "A cooperative for technology workers and digital entrepreneurs, offering specialized financial services.",
    members: 520,
    location: "Kampala, Uganda",
    tags: ["Technology", "Innovation", "Urban"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Village Savings Group",
    description: "Traditional village savings group that has adopted blockchain technology to improve transparency and efficiency.",
    members: 320,
    location: "Arusha, Tanzania",
    tags: ["Village", "Savings", "Traditional"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Educators Credit Union",
    description: "A cooperative serving teachers and education workers with specialized savings and loan products.",
    members: 950,
    location: "Kigali, Rwanda",
    tags: ["Education", "Credit", "Services"],
    image: "https://images.unsplash.com/photo-1544717305-996b815c338c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const CooperativesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Partner <span className="gradient-text">Cooperatives</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Join the growing network of cooperatives and SACCOs leveraging DeCoFi's blockchain technology to transform member financial services.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                <Users className="h-6 w-6 text-decofi-blue mr-2" />
                <span className="text-gray-800 dark:text-gray-200">5,000+ Members</span>
              </div>
              <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                <Building className="h-6 w-6 text-decofi-purple mr-2" />
                <span className="text-gray-800 dark:text-gray-200">20+ Cooperatives</span>
              </div>
              <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                <Globe className="h-6 w-6 text-decofi-green mr-2" />
                <span className="text-gray-800 dark:text-gray-200">5 Countries</span>
              </div>
            </div>
            <Button className="bg-decofi-blue hover:bg-decofi-blue/90" size="lg" asChild>
              <Link to="/contact">Become a Partner <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        {/* Cooperatives List */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Featured Cooperatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cooperatives.map((coop) => (
                <Card key={coop.id} className="transition-all hover:shadow-md overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="h-48 overflow-hidden">
                    <img src={coop.image} alt={coop.name} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardHeader>
                    <CardTitle>{coop.name}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" /> {coop.members} members • {coop.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{coop.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {coop.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="bg-decofi-blue/10 dark:bg-gray-800/50 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
              <Handshake className="h-12 w-12 text-decofi-blue mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Join Our Cooperative Network
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Unlock the power of blockchain for your cooperative or SACCO. Get transparent transactions, automated governance, and secure member services.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-decofi-blue hover:bg-decofi-blue/90" size="lg" asChild>
                  <Link to="/register">Register Your Cooperative</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/help#contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CooperativesPage;
