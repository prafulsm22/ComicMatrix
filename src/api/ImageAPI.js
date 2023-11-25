console.log(process.env.REACT_APP_HF_TOKEN); // This is just for debugging


export async function query(data) {
    try {
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: { 
            "Accept": "image/png",
            "Authorization": `Bearer ${process.env.REACT_APP_HF_TOKEN}`, // Use environment variable

            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const result = await response.blob();
      return URL.createObjectURL(result); // Convert the blob to a URL
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error; // Re-throw to handle it in the calling code
    }
  }
  
  