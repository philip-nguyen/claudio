import pickle

class pipe:

    def __init__(self):
        """
        Empty parent class for ml pipelines that contains 
        shared file i/o that happens in every class.
        """
        pass 

    def save_pipe(self, filename):
        """
        Writes the attributes of the pipeline to a file
        allowing a pipeline to be loaded later with the
        pre-trained pieces in place. 


        Args:
            filename (String): A String input given to 
            specify pipeline name.
        """

        if type(filename) != str:
            raise TypeError("filename must be a string")
        pickle.dump(self.__dict__, open(filename+".mdl", "wb"))



    def load_pipe(self, filename):
        """
        Loads the attributes of a pipeline from a file 
        allowing a pipeline to be utilized later for prediction.

        Args:
            filename (String): A String input given to
            specify the pipeline name.        
        """
        if type(filename) != str:
            raise ValueError("filename must be a string")
        
        if filename[-4:] != '.mdl':
            filename += ".mdl"
        self.__dict__ = pickle.load(open(filename,"rb"))

        

    