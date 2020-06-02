namespace Diplom.Services.Communication
{
    public class DeleteEventResponse : BaseResponse
    {
        private const string DefaultSuccessMessage = "Event deleted succesfully";

        public DeleteEventResponse(bool success, string message) : base(success, message) { }

        public DeleteEventResponse() : this(true, DefaultSuccessMessage) { }
    }
}
