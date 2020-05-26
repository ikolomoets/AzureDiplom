using Diplom.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public interface IContentProvider
    {
        Task RemoveByFullPath(List<string> pathList);
        Task UploadBlobs (Event @event, List<byte[]> blobs);
    }
}
