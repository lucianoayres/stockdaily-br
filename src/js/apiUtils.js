// Utility function to handle API response
export const handleApiResponse = async (response) => {
    if (!response.ok) throw new Error("Network response was not ok")
    const data = await response.json()
    if (data.length === 0) throw new Error("No data available")
    return data
}
