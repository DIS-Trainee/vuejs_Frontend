namespace vuejs.Models
{
    public class PipeInfo{
        public int id {get; set;}
        public int id_tag { get; set; }
        public int pipe_no { get; set; }
        public string? pipe_name { get; set; }
    }
    public class PipeData{
        public int id {get; set;}
        public DateTime? installation_date {get; set;}
        public string? material_type { get; set; }
        public string? pipe_location { get; set; }
        

    }
}