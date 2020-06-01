using Diplom.DataModels;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Repositories
{
    public class BlobStorageContentProvider : IContentProvider
    {
        private readonly CloudBlobClient _client;

        public BlobStorageContentProvider(string connectionString)
        {
            if (CloudStorageAccount.TryParse(connectionString, out var storageAccount))
            {
                _client = storageAccount.CreateCloudBlobClient();
            }
            else
            {
                throw new AccessViolationException();
            }
        }

        public async Task RemoveByFullPath(List<string> pathList)
        {
            var container = _client.GetContainerReference(Constants.BlobContainerName);

            foreach (var path in pathList)
            {
                var blob = container.GetBlobReference(path);

                var isExist = await blob.ExistsAsync();

                if (!isExist)
                {
                    continue;
                }

                await blob.DeleteIfExistsAsync();
            }
        }

        public async Task RemoveImages(Event @event)
        {
            var container = _client.GetContainerReference(Constants.BlobContainerName);

            if (String.IsNullOrEmpty(@event.ImageData))
            {
                return;
            }

            foreach (var fullPath in @event.ImageData.Split(Constants.Delimiter))
            {
                var blob = container.GetBlobReference(Path.GetFileName(fullPath));

                var isExist = await blob.ExistsAsync();

                if (!isExist)
                {
                    continue;
                }

                await blob.DeleteIfExistsAsync();
            }
        }

        public async Task UploadBlobs(Event @event, List<byte[]> blobs)
        {
            var container = _client.GetContainerReference(Constants.BlobContainerName);

            var paths = new List<string>();

            foreach (var blob in blobs)
            {
                var blobName = Guid.NewGuid().ToString().ToLower() + ".png";

                var uploadBlob = container.GetBlockBlobReference(blobName);

                paths.Add(uploadBlob.Uri.AbsoluteUri);

                using (var stream = new MemoryStream(blob, writable: false))
                {
                    await uploadBlob.UploadFromStreamAsync(stream);
                }
            }

            @event.ImageData = String.Join(Constants.Delimiter, paths);
        }
    }
}
