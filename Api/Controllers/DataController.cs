using Microsoft.AspNetCore.Mvc;

public class DataController : BaseController
{
    private DataContext data; 
    public DataController(DataContext data)
    {
        this.data = data;
    }

    [HttpGet("SetData/{value}")]
    public void SetData(string value)
    {
        data.Str = value;
    }

    [HttpGet("GetData")]
    public string GetData()
    {
        return data.Str;
    }

}