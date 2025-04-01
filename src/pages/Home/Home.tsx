import {useEffect} from "react";
import {useLocation} from "react-router";
import HeroSection from "@/shared/components/HeroSection";
import LearningPlanSection from "@/shared/components/LearningPlanSection";
import ServicesSection from "@/shared/components/ServicesSection";
import ContactCard from "@/shared/components/ContactCard";
import TrainingMethods from "@/shared/components/TrainingMethods/TrainingMethods.tsx";
import Navigation from "@/shared/components/Navigation";

function Home() {

    console.log('4')
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const targetSection = document.getElementById(hash.slice(1));
            if (targetSection) {
                targetSection.scrollIntoView({behavior: "instant"});
            }
        }
    }, [location]);

    return (
        <div>
            <Navigation/>
            <HeroSection/>
            <LearningPlanSection/>
            <TrainingMethods/>
            <ServicesSection/>
            <ContactCard/>
        </div>
    )
}

export default Home
