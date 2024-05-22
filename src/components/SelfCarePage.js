import React from 'react';
import VideoEmbed from './VideoEmbed';

const SelfCarePage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Self-Care Techniques</h1>
      <p className="mb-4">There are many small things we can do to improve our health and boost our mood.</p>

      <h2 className="text-2xl mt-4 mb-4">Physical Activity</h2>
      <p>Physical activity plays a pivotal role in promoting both mental and physical health. Engaging in regular exercise has been scientifically proven to have numerous benefits for the body, such as improving cardiovascular health, increasing muscle strength and endurance, and enhancing overall physical fitness. Moreover, physical activity is closely linked to mental well-being, as it stimulates the release of endorphins—natural mood lifters—and reduces levels of stress hormones like cortisol. Regular exercise has been shown to alleviate symptoms of anxiety and depression, improve mood, and enhance cognitive function. By incorporating physical activity into one's routine, individuals can experience not only physical improvements but also a boost in mental resilience and overall well-being.

Furthermore, physical activity promotes a holistic approach to health by addressing various aspects of wellness. It can serve as a form of self-care, providing individuals with an opportunity to unwind, recharge, and focus on themselves amidst the demands of daily life. Additionally, regular exercise fosters a sense of accomplishment and self-confidence as individuals set and achieve fitness goals, leading to improved self-esteem and body image. By embracing physical activity as an integral part of a healthy lifestyle, individuals can cultivate long-term habits that support their mental and physical health, leading to a more vibrant and fulfilling life.</p>
      <ul>
        <li>
          <a
            href="https://www.cdc.gov/physical-activity-basics/benefits/?CDC_AAref_Val=https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm"
            className="text-blue-500 hover:underline"
          >
            CDC Physical Activity basics
          </a>
        </li>
      </ul>
      <div>
        <VideoEmbed videoId="bLgEKIYmBOg" />
      </div>
      <p>
      Meditation serves as a fundamental tool for self-care, offering individuals a pathway to cultivate inner peace, mindfulness, and emotional balance. Through the practice of meditation, individuals can develop a deeper connection with themselves and their surroundings, fostering a sense of clarity and tranquility amidst life's challenges. By dedicating time to quiet reflection and mindfulness, individuals can gain insights into their thoughts, emotions, and behaviors, allowing them to navigate life with greater awareness and intentionality. Moreover, meditation has been shown to have profound effects on mental health, reducing symptoms of stress, anxiety, and depression, and promoting overall emotional well-being. By incorporating meditation into their self-care routine, individuals can nurture their mental and emotional resilience, equipping themselves with valuable tools to cope with life's ups and downs.

Furthermore, meditation offers a holistic approach to self-care, addressing not only the mind but also the body and spirit. As individuals engage in meditation practices such as deep breathing, body scan, and guided imagery, they can promote relaxation, reduce tension in the body, and enhance physical well-being. Additionally, regular meditation can improve sleep quality, boost immune function, and lower blood pressure, contributing to overall physical health and vitality. By prioritizing meditation as part of their self-care regimen, individuals can cultivate a greater sense of balance, harmony, and inner peace, fostering a deeper connection with themselves and the world around them.
      </p>
      <ul>
        <li>
          <a
            href="https://my.clevelandclinic.org/health/articles/17906-meditation"
            className="text-blue-500 hover:underline"
          >
            Basics of meditation
          </a>
        </li>
      </ul>

      <div>
        <h2 className="text-2xl mt-4 mb-4">10-Minute Meditation For Beginners</h2>
        <VideoEmbed videoId="U9YKY7fdwyg" />
      </div>
    </div>
  );
};

export default SelfCarePage;
