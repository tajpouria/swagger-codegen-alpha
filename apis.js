import { useQuery, useMutation } from 'react-query';
import qs from 'qs';

export function usefindPetsQuery(tags, limit) {
  const { status, data, error } = useQuery(
    `findPets`,
    fetch(`http://petstore.swagger.io/api/pets${qs({ tags, limit })}`),
  );
  return { status, data, error };
}

export function useaddPetMutation() {
  const [mutate, { status, error, data }] = useMutation(({ id }) =>
    fetch(`http://petstore.swagger.io/api/pets/${id}`),
  );

  return { mutate, status, error, data };
}

export function usefindPetByIdQuery() {
  const { status, data, error } = useQuery(
    `findPetById`,
    fetch(`http://petstore.swagger.io/api/pets${qs({})}`),
  );
  return { status, data, error };
}

export function usedeletePetMutation() {
  const [mutate, { status, error, data }] = useMutation(({ id }) =>
    fetch(`http://petstore.swagger.io/api/pets/${id}`),
  );

  return { mutate, status, error, data };
}
