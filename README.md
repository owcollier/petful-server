# Petful

-Backend for the Petful app, whose client repo is located [here](https://github.com/owcollier/petful-client)

-Working example of the server deployed on [Heroku](https://petful-wade.herokuapp.com): append */api/cat* or */api/dog* to url and refresh to see a JSON representation of data

##What's going on?

Petful was designed around the idea that pet adoption should operate according to a FIFO(first in, first out) structure. With so many pets up for adoption and in need of a new family, why should we be choosy about who we adopt? The older dog at the shelter may not be as cute and cuddly as the puppy next door, but he or she deserves your love and care too!

As a result, Petful delivers its pets-for-adoption in a queue data structure.

The petful API uses two types of endpoints:

1.GET
&
2.DELETE

Get requests to display pets client-side simply peek at the first item of a given pet queue. V1 of Petful generates this data statically each time you run the server, but further iterations of Petful would ideally pull pet info from local animal shelters and display accordingly: the longer the pet has been at the shelter, the sooner you'll see that pet returned via get request!


Delete requests remove the first pet of a given pet queue from its queue.
This means that a subsequent get request will receive the pet that used to be second in line, whose data was stored in the next property of the previous first of the queue. V1 of Petful simply removes the pet from the queue upon making the delete request for demonstration of functionality.

##Technologies used to create Petful:

- Node.js & Express
