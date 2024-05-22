// AddictionTreatmentPage.js
import React from 'react';
import VideoEmbed from '../components/VideoEmbed';

const AddictionTreatmentPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Addiction Treatment</h1>

      <h2 className="text-2xl font-bold mt-4 mb-2">Drug Addiction</h2>
      <p className="mb-4">
        Drug addiction is a chronic disease characterized by compulsive, or uncontrollable, drug seeking and use despite harmful consequences and changes in the brain, which can be long-lasting. These changes in the brain can lead to the harmful behaviors seen in people who use drugs. Addiction affects the brain's reward circuit by flooding it with the chemical messenger dopamine. This overstimulation of the reward circuit causes the intensely pleasurable "high" that leads people to take a drug again and again.
      </p>
      <p className="mb-4">
        Over time, the brain adjusts to the excess dopamine, which reduces the high that the person feels compared to the high they felt when first taking the drug—an effect known as tolerance. They might take more of the drug to try and achieve the same dopamine high. No single factor can predict whether a person will become addicted to drugs. A combination of genetic, environmental, and developmental factors influences the risk for addiction. The more risk factors a person has, the greater the chance that taking drugs can lead to addiction.
      </p>

      <h2 className="text-2xl font-bold mt-4 mb-2">Alcohol Addiction</h2>
      <p className="mb-4">
        Alcohol addiction, also known as alcoholism or alcohol use disorder (AUD), is a medical condition characterized by an impaired ability to stop or control alcohol use despite adverse social, occupational, or health consequences. Alcoholism is a chronic disease, progressing from moderate to severe and can lead to devastating consequences if not treated. The physical dependence on alcohol means that withdrawal symptoms occur if alcohol use is stopped abruptly.
      </p>
      <p className="mb-4">
        Many factors can contribute to the development of alcohol addiction, including genetic predisposition, social environment, mental health, and drinking patterns. Early intervention is crucial as alcohol addiction can cause severe health issues such as liver disease, cardiovascular problems, and an increased risk of cancers. Effective treatment options include behavioral therapies, medications, and support from groups such as Alcoholics Anonymous (AA).
      </p>

      <h2 className="text-2xl font-bold mt-4 mb-2">Gambling Addiction</h2>
      <p className="mb-4">
        Gambling addiction, also known as compulsive gambling or gambling disorder, is the uncontrollable urge to continue gambling despite the toll it takes on your life. Gambling means that you’re willing to risk something you value in the hope of getting something of even greater value. Whether you bet on sports, scratch cards, roulette, poker, or slots—in a casino, at the track, or online—a gambling problem can strain your relationships, interfere with work, and lead to financial disaster.
      </p>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mt-4 mb-2">Understanding Addiction</h2>
        <VideoEmbed videoId="hBC7i-vHWsU" />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mt-4 mb-2">Resources</h2>
        <ul className="list-disc list-inside">
          <li><a href="https://www.samhsa.gov/find-help/national-helpline" className="text-blue-500 hover:underline">SAMHSA National Helpline</a></li>
          <li><a href="https://www.aa.org/" className="text-blue-500 hover:underline">Alcoholics Anonymous</a></li>
          <li><a href="https://www.na.org/" className="text-blue-500 hover:underline">Narcotics Anonymous</a></li>
          <li><a href="https://www.gamblersanonymous.org/ga/" className="text-blue-500 hover:underline">Gamblers Anonymous</a></li>
          <li><a href="https://www.drugabuse.gov/" className="text-blue-500 hover:underline">National Institute on Drug Abuse</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AddictionTreatmentPage;
