const sampleData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    image: "/nopicture.png",
    description: `Description for item ${i + 1} with additional details about its features and specifications`
  }));
  
  export default sampleData;